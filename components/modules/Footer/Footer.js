function Footer() {
  return (
    <div className="shadow-sm bg-gray-900 mt-5">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Online Shop
          </span>
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center text-gray-400">
          © 2023 Online Shop. All Rights Reserved.
        </span>
      </div>
    </div>
  );
}

export default Footer;