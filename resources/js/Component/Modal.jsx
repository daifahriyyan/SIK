export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        {children}
      </div>
    </div>
  );
};