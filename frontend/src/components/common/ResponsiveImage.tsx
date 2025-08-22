import { useState } from 'react'

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
	const [hasError, setHasError] = useState(false)

	const handleError = () => {
		setHasError(true)
	}

	const getImageSrc = () => {
		if (hasError && fallback) {
			return fallback
		}
		
		// Use mobile version on small screens
		if (srcMobile && window.innerWidth <= 768) {
			return srcMobile
		}
		
		return src
	}

	return (
		<picture>
			{!hasError && (
				<>
					{srcMobile && (
						<source 
							media="(max-width: 768px)" 
							srcSet={srcMobile}
							type="image/webp"
						/>
					)}
					<source srcSet={src} type="image/webp" />
				</>
			)}
			<img 
				src={getImageSrc()} 
				alt={alt}
				className={className}
				onClick={onClick}
				onError={handleError}
				loading="lazy"
			/>
		</picture>
	)
}