import React, { ComponentProps, FC, KeyboardEvent, RefObject } from 'react'
import classNames from 'classnames'
import { EbayIcon, Icon } from '../ebay-icon'
import { EbayBadge } from '../ebay-badge'
import { withForwardRef } from '../common/component-utils'
import { EbayKeyboardEventHandler } from '../common/event-utils/types'

export type EbayIconButtonProps = {
    href?: string;
    icon: Icon;
    badgeNumber?: number;
    badgeAriaLabel?: string;
    transparent?: boolean;
    forwardedRef?: RefObject<HTMLAnchorElement & HTMLButtonElement>;
    onEscape?: EbayKeyboardEventHandler;
}

type HTMLButtonProps = ComponentProps<'button'>;
type HTMLAnchorProps = ComponentProps<'a'>;
type Props = EbayIconButtonProps & HTMLButtonProps & HTMLAnchorProps;

const EbayIconButton: FC<Props> = ({
    href,
    icon,
    badgeNumber,
    badgeAriaLabel,
    transparent,
    className: extraClasses,
    forwardedRef,
    onEscape = () => {},
    onKeyDown = () => {},
    ...rest
}: Props) => {
    const classPrefix = href ? 'icon-link' : 'icon-btn'
    const className = classNames(
        extraClasses,
        classPrefix,
        {
            [`${classPrefix}--badged`]: badgeNumber,
            [`${classPrefix}--transparent`]: transparent
        }
    )
    const children = (
        <>
            <EbayIcon name={icon} />
            {badgeNumber && <EbayBadge type="icon" number={badgeNumber} aria-label={badgeAriaLabel} />}
        </>
    )

    const keyDownHandler = (e: KeyboardEvent<HTMLButtonElement & HTMLAnchorElement>) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            onEscape(e)
        }
        onKeyDown(e)
    }

    return href ? (
        <a
            ref={forwardedRef}
            className={className}
            href={href}
            onKeyDown={keyDownHandler}
            {...rest}
        >
            {children}
        </a>
    ) : (
        <button
            ref={forwardedRef}
            type="button"
            className={className}
            onKeyDown={keyDownHandler}
            {...rest}
        >
            {children}
        </button>
    )
}

export default withForwardRef(EbayIconButton)
