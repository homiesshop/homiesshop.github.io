"use strict";

const settings = window.HOMIESSHOP_CONFIG || {};
const loginForm = document.querySelector("#admin-login");
const setupNotice = document.querySelector("#admin-setup-notice");
const ordersSection = document.querySelector("#admin-orders");
const ordersList = document.querySelector("#admin-orders-list");
const statusMessage = document.querySelector("#admin-status");
const signOutButton = document.querySelector("#sign-out");
const loginButton = document.querySelector("#login-submit");
const endpointIsValid = (() => {
  try {
    const url = new URL(settings.supabaseUrl);
    return url.protocol === "https:" &&
      url.hostname.endsWith(".supabase.co") &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      url.pathname === "/";
  } catch {
    return false;
  }
})();
const keyIsSet = typeof settings.supabaseAnonKey === "string" && settings.supabaseAnonKey.trim().length > 0;
const supabase = endpointIsValid && keyIsSet && window.supabase?.createClient
  ? window.supabase.createClient(settings.supabaseUrl, settings.supabaseAnonKey)
  : null;
let activeUser = null;

function showStatus(message, type = "info") {
  statusMessage.textContent = message;
  statusMessage.className = `admin-status is-${type}`;
}

function formatAdminDate(value) {
  const locale = document.documentElement.lang === "de" ? "de-DE" : "en-GB";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function renderOrders(orders) {
  if (orders.length === 0) {
    ordersList.innerHTML = "";
    const empty = document.createElement("p");
    empty.className = "admin-empty";
    empty.textContent = "No orders yet.";
    ordersList.append(empty);
    return;
  }

  ordersList.replaceChildren(...orders.map((order) => {
    const card = document.createElement("article");
    card.className = "admin-order-card";

    const heading = document.createElement("div");
    heading.className = "admin-order-heading";
    const orderName = document.createElement("h2");
    orderName.textContent = order.customer_name;
    const badge = document.createElement("span");
    badge.className = `order-status is-${order.status}`;
    badge.textContent = order.status;
    heading.append(orderName, badge);

    const timestamp = document.createElement("p");
    timestamp.className = "admin-order-date";
    timestamp.textContent = formatAdminDate(order.created_at);

    const details = document.createElement("dl");
    details.className = "admin-order-details";
    const fields = [
      ["Email", order.email || "—"],
      ["Phone", order.phone || "—"],
      ["Address", order.delivery_address],
      ["Note", order.order_note || "—"],
      ["Total", `${order.total} ${order.currency}`],
      ["Language / currency", `${order.locale.toUpperCase()} / ${order.currency}`]
    ];
    fields.forEach(([label, value]) => {
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = value;
      details.append(term, description);
    });

    const itemList = document.createElement("ul");
    itemList.className = "admin-order-items";
    (Array.isArray(order.items) ? order.items : []).forEach((item) => {
      const row = document.createElement("li");
      row.textContent = item && typeof item === "object"
        ? `${item.name || "Item"} · ${item.size || "—"} × ${item.quantity || 0} · ${item.line_total ?? "—"}`
        : "Invalid order item";
      itemList.append(row);
    });

    card.append(heading, timestamp, details, itemList);
    if (order.status === "pending") {
      const actions = document.createElement("div");
      actions.className = "admin-order-actions";
      [["approved", "Approve order"], ["rejected", "Reject order"]].forEach(([status, label]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `button ${status === "approved" ? "button-dark" : "button-light"}`;
        button.textContent = label;
        button.addEventListener("click", () => updateOrderStatus(order.id, status, button));
        actions.append(button);
      });
      card.append(actions);
    }
    return card;
  }));
}

async function checkAdminAndLoadOrders() {
  ordersSection.hidden = true;
  const membership = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", activeUser.id)
    .maybeSingle();
  if (membership.error) throw membership.error;
  if (!membership.data) {
    showStatus("This account is not on the admin allowlist. It cannot access orders.", "error");
    return false;
  }

  const result = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(100);
  if (result.error) throw result.error;
  renderOrders(result.data || []);
  ordersSection.hidden = false;
  showStatus(`Loaded ${result.data.length} order${result.data.length === 1 ? "" : "s"}.`, "success");
  return true;
}

async function updateOrderStatus(orderId, nextStatus, button) {
  if (!activeUser || !["approved", "rejected"].includes(nextStatus)) return;
  button.disabled = true;
  try {
    const result = await supabase
      .from("orders")
      .update({ status: nextStatus, reviewed_at: new Date().toISOString(), reviewed_by: activeUser.id })
      .eq("id", orderId)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();
    if (result.error) throw result.error;
    if (!result.data) throw new Error("This order was already reviewed or is no longer available.");
    await checkAdminAndLoadOrders();
  } catch (error) {
    console.error("Could not update order status.", error);
    showStatus(`Could not update the order: ${error.message}`, "error");
    button.disabled = false;
  }
}

async function syncSession() {
  if (!supabase) return;
  try {
    const result = await supabase.auth.getSession();
    if (result.error) throw result.error;
    activeUser = result.data.session?.user || null;
    ordersSection.hidden = true;
    signOutButton.hidden = !activeUser;
    if (activeUser) {
      loginForm.hidden = !(await checkAdminAndLoadOrders());
    } else {
      loginForm.hidden = false;
      showStatus("Sign in with the allowlisted admin account to view orders.");
    }
  } catch (error) {
    console.error("Could not check admin session.", error);
    loginForm.hidden = false;
    signOutButton.hidden = !activeUser;
    showStatus(`Could not connect to Supabase: ${error.message}`, "error");
  }
}

if (!supabase) {
  setupNotice.hidden = false;
  loginForm.hidden = true;
  showStatus("The order dashboard is unavailable until config.js has a valid Supabase project URL and anon/publishable key.", "warning");
} else {
  loginForm.hidden = false;
  syncSession();
}

window.homiesshopAdminSubmit = async (event) => {
  if (!supabase) return;
  loginButton.disabled = true;
  showStatus("Signing in…");
  try {
    const result = await supabase.auth.signInWithPassword({
      email: document.querySelector("#admin-email").value.trim(),
      password: document.querySelector("#admin-password").value
    });
    if (result.error) throw result.error;
    activeUser = result.data.user;
    document.querySelector("#admin-password").value = "";
    signOutButton.hidden = false;
    const hasAccess = await checkAdminAndLoadOrders();
    loginForm.hidden = hasAccess;
  } catch (error) {
    console.error("Admin sign-in failed.", error);
    loginForm.hidden = false;
    signOutButton.hidden = !activeUser;
    showStatus(`Sign-in failed or this user is not allowed to view orders: ${error.message}`, "error");
  } finally {
    loginButton.disabled = false;
  }
};

signOutButton.addEventListener("click", async () => {
  if (!supabase) return;
  try {
    const result = await supabase.auth.signOut();
    if (result.error) throw result.error;
    activeUser = null;
    ordersList.replaceChildren();
    signOutButton.hidden = true;
    loginForm.hidden = false;
    ordersSection.hidden = true;
    showStatus("Signed out.");
  } catch (error) {
    console.error("Could not sign out.", error);
    showStatus(`Could not sign out: ${error.message}`, "error");
  }
});

document.querySelector("#refresh-orders").addEventListener("click", async () => {
  if (!supabase || !activeUser) return;
  try {
    await checkAdminAndLoadOrders();
  } catch (error) {
    console.error("Could not refresh orders.", error);
    showStatus(`Could not load orders: ${error.message}`, "error");
  }
});
