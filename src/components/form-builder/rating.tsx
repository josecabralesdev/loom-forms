"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating?: number
  onRatingChange?: (rating: number) => void
  readOnly?: boolean
}

export function Rating({ rating = 0, onRatingChange, readOnly = false, className, ...props }: RatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0)
  
  const handleRating = (rate: number) => {
    if (readOnly || !onRatingChange) return;
    onRatingChange(rate)
  }

  return (
    <div className={cn("flex items-center gap-1", readOnly ? 'cursor-default' : 'cursor-pointer', className)} {...props}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={starValue}
            className={cn(
              "size-6",
              (hoverRating || rating) >= starValue ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
            )}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
          />
        )
      })}
    </div>
  )
}
