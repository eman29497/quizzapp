const Footer = () => {
  return (
    <footer className="w-full py-6 mt-10 border-b border-gray-500  bg-white border-t border-gray-100">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-gray-400 text-sm font-medium">
           2026 <span className="text-sky-500 font-bold">QuickQuiz</span>. All rights reserved.
        </p>
        <div className="flex gap-4 text-gray-400 text-xs">
          <span className="hover:text-sky-500 cursor-pointer transition-colors">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-sky-500 cursor-pointer transition-colors">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-sky-500 cursor-pointer transition-colors">Contact Us</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;