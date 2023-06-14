export default function NotFound() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-screen items-center justify-center bg-white dark:bg-neutral-900">
      {/* https://github.com/vercel/next.js/issues/45620#issuecomment-1488933853 : title hack */}
      <title>404: This page could not be found</title>
      <div>
        <h2 className="inline-block align-top text-[24px] font-medium leading-[50px]">
          404
        </h2>
        <p className="ml-5 inline-block border-l border-l-neutral-300 pl-5 align-middle text-sm font-normal leading-[50px] dark:border-l-neutral-700">
          This page could not be found.
        </p>
      </div>
    </div>
  );
}
