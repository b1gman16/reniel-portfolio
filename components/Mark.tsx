export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="Mark"
    >
      <path d="M20 0 C20 9 21 15 23 17 C25 19 31 20 40 20 C31 20 25 21 23 23 C21 25 20 31 20 40 C20 31 19 25 17 23 C15 21 9 20 0 20 C9 20 15 19 17 17 C19 15 20 9 20 0 Z" />
    </svg>
  );
}