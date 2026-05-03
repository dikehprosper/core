import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Dashboard() {
    const [showMenuId, setShowMenuId] = useState(null);
    const [menuPosition, setMenuPosition] = useState('bottom');
    const menuRef = React.useRef(null);

    // Close menu on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (showMenuId && menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenuId(null);
            }
        }
        if (showMenuId) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenuId]);

    // Use correct RootState type from your store, or fallback to any
    const { userData } = useSelector((state) => state.client);
    const [isLoading, setIsLoading] = useState(true);
    const [showApproveDeleteModal, setShowApproveDeleteModal] = useState(false);
    const [showUpdateVideoModal, setShowUpdateVideoModal] = useState(false);
    const navigate = useNavigate();

   

    // In return statement, at the top:
    if (isLoading) {
        return <LoadingSkeleton />;
    }


    return (
        <div className='min-h-screen px-[18px] py-[44px] sm:px-[48px]'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-foreground whitespace-nowrap'>
                        Hello,{" "}
                    
                    </h1>
                    <p className='text-foreground opacity-70 text-[17px] mt-1'>
                        Welcome To Your Workspace
                    </p>
                </div>

            </div>
        </div>
    );
}


const LoadingSkeleton = () => (
    <div className='w-full animate-pulse mt-2 px-[18px] py-[44px] sm:px-[48px]'>
        <div className='max-w-7xl mx-auto'>
            {/* Header skeleton */}
            <div className='mb-8'>
                <div className='h-8 bg-foreground/10 rounded w-48 mb-2' />
                <div className='h-5 bg-foreground/10 rounded w-64' />
            </div>

            {/* Tabs and button skeleton */}
            <div className='flex items-center justify-between mb-10'>
                <div className='flex space-x-6'>
                    <div className='h-6 bg-foreground/10 rounded w-24' />
                    <div className='h-6 bg-foreground/10 rounded w-20' />
                </div>
                <div className='h-10 bg-foreground/10 rounded-lg w-32' />
            </div>

            {/* AI Apps Grid skeleton */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                {Array(9)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className='flex items-start gap-3 p-3 bg-foreground/10 rounded-xl border border-foreground/5'
                        >
                            <div className='w-12 h-12 bg-foreground/20 rounded-xl flex-shrink-0' />
                            <div className='flex-1 space-y-2'>
                                <div className='h-4 bg-foreground/20 rounded w-3/4' />
                                <div className='h-3 bg-foreground/20 rounded w-full' />
                            </div>
                        </div>
                    ))}
            </div>

            {/* Recent Videos section skeleton */}
            <div>
                <div className='h-6 bg-foreground/10 rounded w-32 mb-6' />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                    {Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className='rounded-xl overflow-hidden border border-foreground/5'
                            >
                                <div className='aspect-video bg-foreground/10' />
                                <div className='p-2 bg-foreground/5 space-y-2'>
                                    <div className='h-4 bg-foreground/10 rounded w-full' />
                                    <div className='h-3 bg-foreground/10 rounded w-2/3' />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    </div>
);







