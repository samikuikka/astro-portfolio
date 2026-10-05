task("sla-review", {
  judge: { mode: "cascade" }, // every t.judge in this task
  adapter,
  deliverables,
});
