export default function Button({ onClick, children, color = "blue" }) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white px-6 py-2 rounded shadow-lg transition duration-300`}
    >
      {children}
    </button>
  );
}
