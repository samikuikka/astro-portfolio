test("sla-credit-cap", async (t, { deliverables }) => {
  await t.judge(
    deliverables.redlinedDocument,
    "PASS when the SLA credit cap is marked up from 15% to 30%.",
    { judge: { mode: "cascade" } }, // this test only
  );
});
