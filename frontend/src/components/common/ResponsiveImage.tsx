import { useState } from 'react'

/**
 * ResponsiveImage Component
 * 
 * A responsive image component that optimizes image delivery based on device capabilities and screen size.
 * Browser behavior:
 * - Modern browsers: Use WebP format from appropriate source
 * - Older browsers: Fall back to original image format
 * - Mobile devices: Receive optimized mobile version when available
 * - Failed loads: Automatically switch to fallback image
 */

interface ResponsiveImageProps {
	src: string
	srcMobile?: string
	fallback?: string
	alt: string
	className?: string
	onClick?: () => void
}

export default function ResponsiveImage({ 
	src, 
	srcMobile, 
	fallback, 
	alt, 
	className,
	onClick 
}: ResponsiveImageProps) {
	// Track if image failed to load for error handling
	const [hasError, setHasError] = useState(false)

	// Called when any image fails to load - triggers fallback behavior
	const handleError = () => {
		setHasError(true)
	}

	//Determines which image source to use based on error state and screen size
	//This is used as fallback for the <img> element when <source> elements fail
	const getImageSrc = () => {
		// If image failed and we have a fallback, use it
		if (hasError && fallback) {
			return fallback
		}
		
		// Use mobile version on small screens (client-side detection)
		if (srcMobile && window.innerWidth <= 768) {
			return srcMobile
		}
		
		// Default to desktop/main image
		return src
	}

	return (
		<picture>
			{/* Only show <source> elements if no error occurred */}
			{!hasError && (
				<>
					{/* Mobile-specific source: browser automatically selects this on screens ≤768px */}
					{srcMobile && (
						<source 
							media="(max-width: 768px)" 
							srcSet={srcMobile}
							type="image/webp"
						/>
					)}
					{/* Desktop/default source: used when mobile source doesn't match */}
					<source srcSet={src} type="image/webp" />
				</>
			)}
			{/* 
			Fallback <img> element: 
			- Used when browser doesn't support <picture>/<source> 
			- Used when WebP isn't supported
			- Used when all <source> elements fail to load
			*/}
			<img 
				src={getImageSrc()} 
				alt={alt}
				className={className}
				onClick={onClick}
				onError={handleError} // Triggers error handling if this image fails
				loading="lazy" // Defers loading until image enters viewport
			/>
		</picture>
	)
}