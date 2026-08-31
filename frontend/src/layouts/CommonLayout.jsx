import React from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function CommonLayout() {
    return (
        <React.Fragment>
            {/* 1. Base wrapper: Locks viewport height, prevents global page bouncing */}
            <section className="flex w-full h-screen overflow-hidden bg-slate-50 font-sans antialiased">

                {/* 2. Sidebar Container: Fixed width, independent dark theme styling */}
                <aside className="hidden md:flex flex-col w-64 h-full bg-slate-900 border-r border-slate-800 shrink-0">
                    <Sidebar />
                </aside>

                {/* 3. Main Content Wrapper: Takes up remaining horizontal space */}
                <div className="flex flex-col flex-1 h-full min-w-0">

                    {/* Header: Fixed top height, clean white container */}
                    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 z-10 shrink-0">
                        <Header />
                    </header>

                    {/* 4. Scrollable Main Body: THIS is what scrolls when data overflows */}
                    <main className="flex-1 overflow-y-auto p-6 focus:outline-none">
                        <div className="max-w-7xl mx-auto w-full min-h-full flex flex-col justify-between">

                            {/* Dynamic Page Content injected here */}
                            {/* <div className="w-full pb-8">
                                {children || (
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl h-[120vh] flex items-center justify-center text-slate-400">
                                        [Main Content Canvas - Scroll Down to Test Overflow]
                                    </div>
                                )}
                            </div> */}

                            <div className="w-full pb-8">
                                <Outlet />
                            </div>

                            {/* Footer: Stays pinned to bottom of page scroll layout */}
                            <footer className="h-12 border-t border-slate-200/60 flex items-center pt-4 mt-auto shrink-0">
                                <Footer />
                            </footer>
                        </div>
                    </main>

                </div>
            </section>
        </React.Fragment>
    )
}