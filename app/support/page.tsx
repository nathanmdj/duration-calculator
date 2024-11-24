import React from "react"
import Image from "next/image"
import Link from "next/link"

const SupportPage = () => {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-5">
        <Image
          src="/icons/gcash_logo.png"
          alt="Support"
          width={100}
          height={100}
        />
        <Image
          src="/images/gcash.jpeg"
          alt="Support"
          width={300}
          height={300}
        />
      </div>
      <p className="text-sm text-gray-500">or </p>
      <Link
        href="https://ko-fi.com/nathanmdj"
        target="_blank"
        className="text-blue-500 underline"
      >
        Paypal via Ko-Fi
      </Link>
      <p className="mt-4 text-sm text-gray-500">
        Any amount will be much appreciated
      </p>
    </div>
  )
}

export default SupportPage
