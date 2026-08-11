import {
  expect,
  test,
  type Locator,
  type Page,
  type Request,
} from "@playwright/test";
import { findTemplate, startTemplate } from "./helpers/template-server";

const messages = {
  dashfluenceContact: "Details validated locally. No information was sent.",
  dashfluenceNewsletter:
    "Email validated locally. Newsletter delivery is not connected in this demo.",
  fuelContact: "Preview only. No job request was sent.",
  groviaContact: "Preview only. No message was sent.",
  groviaNewsletter: "Preview only. No subscription was created.",
  paybleContact: "Details validated locally. No information was sent.",
  paybleNewsletter:
    "Email validated locally. Newsletter delivery is not connected in this demo.",
  pilarContact: "Validated locally. No information was sent.",
  riveroAppointment: "Validated locally. No appointment was booked.",
  riveroContact: "Validated locally. No message was sent.",
  saazaiContact: "Details validated locally. No information was sent.",
  saazaiNewsletter:
    "Email validated locally. Newsletter delivery is not connected in this demo.",
} as const;

const previewCopy = {
  fuelContact:
    "Preview a project request with the form below. Connect form delivery before accepting submissions.",
  pilarContact:
    "Preview the inquiry flow below. This demo does not contact a team.",
  saazaiNewsletter:
    "* Preview only. Connect newsletter delivery before accepting subscriptions.",
} as const;

test.describe.configure({ mode: "serial" });

test("Fuel keeps its contact request local", async ({ page }) => {
  const server = await startTemplate(findTemplate("fuel"));
  try {
    await open(page, server.baseUrl, "/contact");
    const form = page.locator("form").filter({
      has: page.getByRole("button", { name: "Submit", exact: true }),
    });
    const previewIntro = form.locator("p").filter({
      hasText: "Preview a project request with the form below.",
    });
    await expect
      .poll(async () =>
        (await previewIntro.innerText()).replace(/\s+/g, " ").trim(),
      )
      .toBe(previewCopy.fuelContact);
    await expect(form.getByText("within 24 hours")).toHaveCount(0);
    await expectNativeInvalidBlocked(form, messages.fuelContact);

    await form.locator('[name="firstName"]').fill("Preview");
    await form.locator('[name="lastName"]').fill("Visitor");
    await form.locator('[name="email"]').fill("preview@example.com");
    await form.locator('[name="message"]').fill("A local-only project request.");
    await submitLocally({
      form,
      message: messages.fuelContact,
      page,
      retainedInput: form.locator('[name="firstName"]'),
      retainedValue: "Preview",
      submit: form.getByRole("button", { name: "Submit", exact: true }),
    });
  } finally {
    await server.stop();
  }
});

test("Grovia keeps its contact and newsletter forms local", async ({ page }) => {
  const server = await startTemplate(findTemplate("grovia"));
  try {
    await open(page, server.baseUrl, "/");
    const contact = page.locator("form").filter({
      has: page.getByLabel("Message", { exact: true }),
    });
    await contact.getByLabel("Email", { exact: true }).fill("invalid-email");
    await expectNativeInvalidBlocked(contact, messages.groviaContact);
    await contact.getByLabel("Name", { exact: true }).fill("Preview Visitor");
    await contact.getByLabel("Email", { exact: true }).fill("preview@example.com");
    await contact.getByLabel("Message", { exact: true }).fill("A local-only message.");
    await submitLocally({
      form: contact,
      message: messages.groviaContact,
      page,
      retainedInput: contact.getByLabel("Name", { exact: true }),
      retainedValue: "Preview Visitor",
      submit: contact.getByRole("button", { name: "Submit", exact: true }),
    });

    const newsletterSection = page.getByRole("contentinfo").filter({
      has: page.getByRole("heading", { name: "Sign up for our newsletter" }),
    });
    const newsletter = newsletterSection.locator("form").filter({
      has: page.getByLabel("Newsletter email"),
    });
    await newsletter.getByLabel("Newsletter email").fill("invalid-email");
    await expectNativeInvalidBlocked(newsletter, messages.groviaNewsletter);
    await newsletter.getByLabel("Newsletter email").fill("preview@example.com");
    await submitLocally({
      form: newsletter,
      message: messages.groviaNewsletter,
      page,
      retainedInput: newsletter.getByLabel("Newsletter email"),
      retainedValue: "preview@example.com",
      status: newsletterSection.getByRole("status"),
      submit: newsletter.getByRole("button", { name: "Subscribe" }),
    });
  } finally {
    await server.stop();
  }
});

test("Rivero keeps contact and appointment details local", async ({ page }) => {
  const server = await startTemplate(findTemplate("rivero"));
  try {
    await open(page, server.baseUrl, "/contact-us");
    const contact = page.getByRole("form", { name: "Contact Rivero" });
    await expectNativeInvalidBlocked(contact, messages.riveroContact);
    await contact.getByLabel("First name").fill("Preview");
    await contact.getByLabel("Last name").fill("Visitor");
    await contact.getByLabel("Work email").fill("preview@example.com");
    await contact.getByLabel("Business type").selectOption("Digital Marketing");
    await contact.getByLabel("Message").fill("A local-only message.");
    await submitLocally({
      form: contact,
      message: messages.riveroContact,
      page,
      retainedInput: contact.getByLabel("First name"),
      retainedValue: "Preview",
      submit: contact.getByRole("button", { name: /Send Message/ }),
    });

    await open(page, server.baseUrl, "/appointment");
    const appointment = page.getByRole("form", {
      name: "Schedule a Rivero demo",
    });
    await expectNativeInvalidBlocked(appointment, messages.riveroAppointment);
    await appointment.getByLabel("First Name*").fill("Preview");
    await appointment.getByLabel("Last Name*").fill("Visitor");
    await appointment.getByLabel("Email*").fill("preview@example.com");
    await appointment.getByLabel("Company Name*").fill("Preview Co");
    await appointment.getByLabel("Job Title*").fill("Tester");
    await appointment.getByLabel("Team Size*").fill("2");
    await appointment.getByLabel("Message*").fill("A local-only appointment note.");
    await submitLocally({
      form: appointment,
      message: messages.riveroAppointment,
      page,
      retainedInput: appointment.getByLabel("First Name*"),
      retainedValue: "Preview",
      submit: appointment.getByRole("button", { name: /Send Message/ }),
    });
  } finally {
    await server.stop();
  }
});

test("Saazai keeps contact and newsletter details local", async ({ page }) => {
  const server = await startTemplate(findTemplate("saazai"));
  try {
    await open(page, server.baseUrl, "/contact");
    const contact = page.locator("form").filter({
      has: page.locator("#saazai-first-name"),
    });
    await expectNativeInvalidBlocked(contact, messages.saazaiContact);
    await contact.getByLabel("First Name").fill("Preview");
    await contact.getByLabel("Last Name").fill("Visitor");
    await contact.getByLabel("Work email").fill("preview@example.com");
    await contact.getByLabel("Phone Number").fill("+46 70 123 45 67");
    await contact.getByLabel("Write Message").fill("A local-only message.");
    await submitLocally({
      form: contact,
      message: messages.saazaiContact,
      page,
      retainedInput: contact.getByLabel("First Name"),
      retainedValue: "Preview",
      submit: contact.getByRole("button", { name: /Submit/ }),
    });

    await open(page, server.baseUrl, "/");
    const newsletterSection = page.getByRole("contentinfo").filter({
      has: page.getByRole("heading", { name: "Join Our Newsletter" }),
    });
    await expect(
      newsletterSection.getByText(previewCopy.saazaiNewsletter, { exact: true }),
    ).toBeVisible();
    await expect(
      newsletterSection.getByText("send you weekly updates"),
    ).toHaveCount(0);
    const newsletter = newsletterSection.locator("form").filter({
      has: page.locator("#saazai-newsletter"),
    });
    await expectNativeInvalidBlocked(newsletter, messages.saazaiNewsletter);
    await newsletter.getByLabel("Email address").fill("preview@example.com");
    await submitLocally({
      form: newsletter,
      message: messages.saazaiNewsletter,
      page,
      retainedInput: newsletter.getByLabel("Email address"),
      retainedValue: "preview@example.com",
      status: newsletterSection.getByRole("status"),
      submit: newsletter.getByRole("button", { name: "Subscribe" }),
    });
  } finally {
    await server.stop();
  }
});

test("Payble keeps contact and newsletter details local", async ({ page }) => {
  const server = await startTemplate(findTemplate("payble"));
  try {
    await open(page, server.baseUrl, "/");
    const newsletter = page.locator("form").filter({
      has: page.locator("#payble-newsletter-email"),
    });
    await newsletter.getByRole("button", { name: /Subscribe/ }).click();
    await expect(
      newsletter.getByText("Enter a valid email address.", { exact: true }),
    ).toBeVisible();
    await expect(
      newsletter.getByText(messages.paybleNewsletter, { exact: true }),
    ).toHaveCount(0);
    await newsletter.getByLabel("Email address").fill("@");
    await newsletter.getByRole("button", { name: /Subscribe/ }).click();
    await expect(
      newsletter.getByText("Enter a valid email address.", { exact: true }),
    ).toBeVisible();
    await expect(
      newsletter.getByText(messages.paybleNewsletter, { exact: true }),
    ).toHaveCount(0);
    await newsletter.getByLabel("Email address").fill("preview@example.com");
    await submitLocally({
      form: newsletter,
      message: messages.paybleNewsletter,
      page,
      retainedInput: newsletter.getByLabel("Email address"),
      retainedValue: "preview@example.com",
      status: newsletter.getByRole("status"),
      submit: newsletter.getByRole("button", { name: /Subscribe/ }),
    });

    await open(page, server.baseUrl, "/contact");
    const contact = page.locator("form").filter({
      has: page.getByLabel("Full Name"),
    });
    await expectNativeInvalidBlocked(contact, messages.paybleContact);
    await contact.getByLabel("Full Name").fill("Preview Visitor");
    await contact.getByLabel("Phone Number").fill("+46 70 123 45 67");
    await contact.getByLabel("Email", { exact: true }).fill("preview@example.com");
    await contact.getByLabel("Message", { exact: true }).fill("A local-only message.");
    await contact.getByRole("checkbox").check();
    await submitLocally({
      form: contact,
      message: messages.paybleContact,
      page,
      retainedInput: contact.getByLabel("Full Name"),
      retainedValue: "Preview Visitor",
      status: contact.getByRole("status"),
      submit: contact.getByRole("button", { name: /Send Message/ }),
    });
  } finally {
    await server.stop();
  }
});

test("Pilar keeps its contact inquiry local", async ({ page }) => {
  const server = await startTemplate(findTemplate("pilar"));
  try {
    await open(page, server.baseUrl, "/contact");
    const contactPage = page.getByRole("main");
    await expect(
      contactPage.getByText(previewCopy.pilarContact, { exact: true }),
    ).toBeVisible();
    await expect(contactPage.getByText("get back to you quickly")).toHaveCount(0);
    const form = page.locator("form").filter({
      has: page.locator('[name="purpose"]'),
    });
    await form.getByRole("button", { name: "Send Inquiry" }).click();
    await expect(form.getByText("Enter your name.", { exact: true })).toBeVisible();
    await expect(
      form.getByText(messages.pilarContact, { exact: true }),
    ).toHaveCount(0);
    await form.getByLabel("Name").fill("Preview Visitor");
    await form.getByLabel("Email").fill("preview@example.com");
    await form.getByLabel("Contact Purpose").selectOption("general");
    await form.getByLabel("How can we help?").fill("A local-only inquiry.");
    await submitLocally({
      form,
      message: messages.pilarContact,
      page,
      retainedInput: form.getByLabel("Name"),
      retainedValue: "Preview Visitor",
      submit: form.getByRole("button", { name: "Send Inquiry" }),
    });
  } finally {
    await server.stop();
  }
});

test("Dashfluence keeps contact and newsletter details local", async ({ page }) => {
  const server = await startTemplate(findTemplate("dashfluence"));
  try {
    await open(page, server.baseUrl, "/Dashfluence");
    const newsletter = page.locator("form").filter({
      has: page.locator("#dashfluence-email"),
    });
    await expectNativeInvalidBlocked(newsletter, messages.dashfluenceNewsletter);
    await newsletter.getByLabel("Want smarter growth tips in your inbox?").fill("preview@example.com");
    await submitLocally({
      form: newsletter,
      message: messages.dashfluenceNewsletter,
      page,
      retainedInput: newsletter.getByLabel("Want smarter growth tips in your inbox?"),
      retainedValue: "preview@example.com",
      submit: newsletter.getByRole("button", { name: "Send", exact: true }),
    });

    await open(page, server.baseUrl, "/Dashfluence/contact-us");
    const contact = page.locator("form").filter({
      has: page.locator('[name="firstName"]'),
    });
    await expectNativeInvalidBlocked(contact, messages.dashfluenceContact);
    await contact.getByLabel("First name").fill("Preview");
    await contact.getByLabel("Last name").fill("Visitor");
    await contact.getByLabel("Email").fill("preview@example.com");
    await contact.getByLabel("Company Name").fill("Preview Co");
    await contact.getByLabel("Phone").fill("+46 70 123 45 67");
    await contact.getByLabel("Budget").selectOption("$2k - $5k");
    await contact.getByLabel("Message").fill("A local-only message.");
    await submitLocally({
      form: contact,
      message: messages.dashfluenceContact,
      page,
      retainedInput: contact.getByLabel("First name"),
      retainedValue: "Preview",
      submit: contact.getByRole("button", { name: /Send message/ }),
    });
  } finally {
    await server.stop();
  }
});

async function open(page: Page, baseUrl: string, route: string) {
  const response = await page.goto(new URL(route, `${baseUrl}/`).toString(), {
    waitUntil: "domcontentloaded",
  });
  expect(response?.status()).toBe(200);
}

async function expectNativeInvalidBlocked(form: Locator, message: string) {
  expect(await form.evaluate((node: HTMLFormElement) => node.checkValidity())).toBe(
    false,
  );
  await form.locator('button[type="submit"]').click();
  await expect(form.getByText(message, { exact: true })).toHaveCount(0);
}

async function submitLocally({
  form,
  message,
  page,
  retainedInput,
  retainedValue,
  status,
  submit,
}: {
  form: Locator;
  message: string;
  page: Page;
  retainedInput: Locator;
  retainedValue: string;
  status?: Locator;
  submit: Locator;
}) {
  await form.scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle");

  const forbiddenRequests: string[] = [];
  const collect = (request: Request) => {
    const method = request.method().toUpperCase();
    const resourceType = request.resourceType();
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      forbiddenRequests.push(`${method} ${resourceType} ${request.url()}`);
      return;
    }
    if (["fetch", "xhr"].includes(resourceType) && !isNextPrefetch(request)) {
      forbiddenRequests.push(`${method} ${resourceType} ${request.url()}`);
    }
  };
  page.on("request", collect);
  const statusMessage = status ?? form.getByText(message, { exact: true });
  try {
    await submit.click();
    if (status) await expect(statusMessage).toHaveText(message);
    await expect(statusMessage).toBeVisible();
    await page.waitForTimeout(100);
  } finally {
    page.off("request", collect);
  }

  expect(forbiddenRequests).toEqual([]);
  await expect(retainedInput).toHaveValue(retainedValue);
  await retainedInput.fill(`${retainedValue} edited`);
  if (status) {
    await expect(statusMessage).toBeEmpty();
  } else {
    await expect(statusMessage).toHaveCount(0);
  }
}

function isNextPrefetch(request: Request) {
  const headers = request.headers();
  return (
    Object.prototype.hasOwnProperty.call(headers, "next-router-prefetch") ||
    headers.purpose?.toLowerCase() === "prefetch"
  );
}
