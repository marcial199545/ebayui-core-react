import React, { FC } from 'react'
import classNames from 'classnames'
import getRating from './eek-util'
import { EbayIcon } from '../ebay-icon'

// TODO: convert string to string union for stricter
export type EbayEekProps = {
    rating: string;
    max: string;
    min: string;
    a11yText?: string;
    className?: string;
}

const EbayEek: FC<EbayEekProps> = ({
    min = '',
    max = '',
    rating,
    a11yText,
    className: extraClasses
}) => {
    const parsedRating = getRating({ rating, min, max })
    const className = classNames(extraClasses, 'eek',
        { [`eek--rating-${parsedRating}`]: !!parsedRating }
    )
    const backupA11yText = `Energy Rating: ${rating}. Range: ${max} - ${min}.`
    return (
        <div
            className={className}
            role="figure"
            aria-label={a11yText || backupA11yText} >
            <div className="eek__container" aria-hidden>
                <span className="eek__rating-range">
                    <span aria-hidden="true">{max}</span>
                    <EbayIcon name="eekRangeArrow" />
                    <span aria-hidden="true">{min}</span>
                </span>
                <span className="eek__rating" aria-hidden="true">{rating}</span>
            </div>
            <EbayIcon name="eekArrow" height="28px" width="11px" />
        </div>
    )
}


export default EbayEek
