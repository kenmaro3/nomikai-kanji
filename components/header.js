import React from 'react'
import Link from "next/link"

function Header() {
    return (
        <Link href="/">
            {/* <h1 className="cursor-pointer text-xl font-bold px-4 py-2 shadow-sm mb-3"><span className="mr-1">🍺</span>ノミカイ・カンジ</h1> */}
            <img className='cursor-pointer h-16' src="logo.png"></img>
        </Link>
    )
}

export default Header