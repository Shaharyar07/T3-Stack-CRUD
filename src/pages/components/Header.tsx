import { signIn, signOut, useSession } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  return (
    <div>
      <header className="body-font ">
        <div className="container  flex flex-col items-center justify-between p-5 md:flex-row">
          <a className="title-font mb-4 flex items-center font-medium md:mb-0">
            <span className="ml-5 text-2xl">Post It</span>
          </a>

          <div>
            <strong className="mr-2">{session?.user?.name || session?.user?.email}</strong>
            <button
              onClick={session ? () => void signOut() : () => void signIn()}
              className="ml-2 inline-flex items-center rounded border-0  bg-cyan-500  py-1 px-3 text-base hover:bg-blue-600 font-semibold text-white focus:outline-none md:mt-0"
            >
              {session ? "Sign out" : "Sign in"}
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="ml-1 h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
