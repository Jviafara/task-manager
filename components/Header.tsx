'use client';

import { useBoardStore } from '@/store/BoardStore';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Avatar from 'react-avatar';

function Header() {
    const [searchString, setSearchString] = useBoardStore((satate) => [
        satate.searchString,
        satate.setSearchString,
    ]);

    return (
        <header>
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50" />
            <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
                <Image
                    src="https://links.papareact.com/c2cdd5"
                    alt="logo"
                    width={300}
                    height={100}
                    className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
                />
                <div className="flex items-center space-x-5 flex-1 justify-end w-full">
                    {/* Search Box */}
                    <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            className="flex-1 outline-none p-2"
                        />
                        <button type="submit" hidden>
                            Search
                        </button>
                    </form>
                    {/* Search Box */}

                    {/* Avatar */}
                    <Avatar name="Jesús Viafara" round size="50" />
                    {/* Avatar */}
                </div>
            </div>
        </header>
    );
}

export default Header;
