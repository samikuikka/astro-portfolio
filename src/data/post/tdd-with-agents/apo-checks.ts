check("answers-all-five-questions", (t, { deliverables }) => {
  const findingsText = joinFindings(deliverables.result.findings);

  t.check(findingsText, similarity("JWT Bearer tokens", 0.6), "auth method");
  t.check(
    findingsText,
    similarity("OAuth 2.0 client credentials", 0.6),
    "auth flow",
  );
});

check("answers-grounded-in-spec", async (t, { deliverables }) => {
  await t.judge(
    deliverables.result.findings,
    "PASS if the answers cite or reference specific sections, tables, or " +
      "endpoint listings of the spec (e.g. 'Section 2 Architecture', " +
      "'Section 3 Authentication', 'Section 5 Endpoints'). FAIL if the " +
      "answers are generic API knowledge that could have been written " +
      "without reading spec.md.",
  );
});
