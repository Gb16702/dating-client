'use client'
import {useRouter} from 'next/navigation'

function ArrowLeft() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             className="lucide lucide-move-left">
            <path d="M6 8L2 12L6 16"/>
            <path d="M2 12H22"/>
        </svg>
    )
}

const ArrowBack = () => {
    const router = useRouter()

    return (
        <div className="flex items-center cursor-pointer" onClick={() => router.back()}>
            <ArrowLeft/>
            <span className="text-lg ml-3">Back</span>
        </div>
    )
}

export default ArrowBack