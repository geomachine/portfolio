"use client";

export function Navbar({ activePage, setActivePage }) {
    const navItems = ["About", "Resume", "Portfolio", "Blog", "Contact"];

    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-max bg-card border-2 border-foreground sketch-border z-[100] lg:absolute lg:top-0 lg:right-0 lg:left-auto lg:bottom-auto lg:translate-x-0 lg:border-t-0 lg:border-r-0 lg:border-l-2 lg:border-b-2 transition-all duration-500">
            <ul className="flex justify-center items-center px-2 py-2 lg:px-6 lg:py-0 gap-1 lg:gap-2">
                {navItems.map(item => {
                    const isActive = activePage === item.toLowerCase();
                    return (
                        <li key={item} className="relative">
                            <button
                                className={`relative z-10 py-3 px-3 lg:py-4 lg:px-6 text-[18px] lg:text-[22px] font-signature font-bold transition-all duration-300 block ${isActive ? 'text-background bg-accent-secondary sketch-border translate-y-[-2px]' : 'text-muted hover:text-foreground'}`}
                                onClick={() => setActivePage(item.toLowerCase())}
                            >
                                {item}
                            </button>
                            {isActive && (
                                <div className="hidden"></div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}
