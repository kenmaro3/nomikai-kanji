import React from 'react'
import Link from "next/link"
import Image from 'next/image'

function Header() {
    return (
        <Link href="/">
            {/* <h1 className="cursor-pointer text-xl font-bold px-4 py-2 shadow-sm mb-3"><span className="mr-1">🍺</span>ノミカイ・カンジ</h1> */}
            <Image className='cursor-pointer' src="/logo.png" width={200} height={100} />
        </Link>
    )
}

export default Header