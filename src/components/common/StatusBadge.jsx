export function StatusBadge({active}) {
  return (
    <span
      className={
       active ? "status-badge active" : "status-badge inactive"
      }
    >
      {active ? "🟢 Active" : "🔴 Inactive"}
    </span>
  );
}
