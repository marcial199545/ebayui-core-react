import React from 'react'
import { storiesOf } from '@storybook/react';
import { linkClickAction, linkPressAction } from '../../../.storybook/action'
import { EbayFakeMenu, EbayFakeMenuItem as Item, EbayFakeMenuSeparator as Separator } from '../index'

storiesOf('ebay-fake-menu', module)
    .add('Default', () => (<>
        <EbayFakeMenu
            onClick={linkClickAction('menu click')}
            onKeyDown={linkPressAction('key down')}
            onSelect={linkClickAction('select')}
        >
            <Item
                href="http://ebay.com"
                onClick={linkClickAction('item click')}
            >Item 1 that has very long text</Item>
            <Item href="http://ebay.com" current>Current page</Item>
            <Item href="http://ebay.com">Item 3</Item>
        </EbayFakeMenu>
    </>))
    .add('Without tick icon', () => (<>
        <EbayFakeMenu itemMatchesUrl={false}>
            <Item href="#">Item 1 that has very long text</Item>
            <Item href="#" current>Current page</Item>
            <Item href="#">Item 3</Item>
        </EbayFakeMenu>
    </>))
    .add('With Separator', () => (<>
        <EbayFakeMenu>
            <Item href="#">item 1 that has very long text</Item>
            <Item href="#">Item 2</Item>
            <Separator />
            <Item href="#">Item 3</Item>
            <Item href="#">Item 4</Item>
            <Item href="#">Item 5</Item>
        </EbayFakeMenu>
    </>))
    .add('With Disabled Item', () => (<>
        <EbayFakeMenu>
            <Item href="#">item 1 that has very long text</Item>
            <Item disabled>Item 2</Item>
            <Item href="#">Item 3</Item>
        </EbayFakeMenu>
    </>))
