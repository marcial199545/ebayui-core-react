import React, { Children, cloneElement, ComponentProps, FC, ReactNode, isValidElement, MouseEvent } from 'react'
import classNames from 'classnames'

type BreadcrumbProps = ComponentProps<'div'> & {
    /**
     * Breadcrumbs expects `<EbayBreadcrumbItem/>` as children.
     * Other elements will not work.
     *
     * @see Docs https://github.com/eBay/ebayui-core-react/tree/main/src/components/ebay-breadcrumb#usage
     */
    children: ReactNode;
    id?: string;
    a11yHeadingTag?: keyof JSX.IntrinsicElements;
    a11yHeadingText?: string;
    onSelect?: (event: MouseEvent | KeyboardEvent, target: HTMLElement) => void;
}

const Breadcrumbs: FC<BreadcrumbProps> = ({
    a11yHeadingText = 'Page navigation',
    a11yHeadingTag = 'h2',
    id = 'ebay-breadcrumb',
    children: breadcrumbItems,
    className,
    onSelect = () => {},
    ...rest
}) => {
    const headingId = `${id}-breadcrumbs-heading`
    const lastItemIndex = Children.count(breadcrumbItems) - 1
    const A11yHeadingTag = a11yHeadingTag
    const containsLink = Children.toArray(breadcrumbItems)
        .some(item => isValidElement<{href: string}>(item) && !!item.props.href)
    const tag = containsLink ? 'a' : 'button'

    return (
        <nav
            {...rest}
            aria-labelledby={headingId}
            className={classNames('breadcrumbs', className)}
            role="navigation"
        >
            <A11yHeadingTag id={headingId} className="clipped">{a11yHeadingText}</A11yHeadingTag>
            <ul>
                {Children.map(breadcrumbItems, (item, index) => {
                    if (!isValidElement(item)) {
                        return null
                    }

                    const isLastItem = index === lastItemIndex
                    const { href, children } = item.props
                    const itemProps = {
                        tag,
                        isLastItem,
                        href,
                        children,
                        onClick: (event: MouseEvent) => onSelect(event, event.target as HTMLElement)
                    }

                    return cloneElement(item, itemProps)
                })}
            </ul>
        </nav>
    )
}

export default Breadcrumbs
