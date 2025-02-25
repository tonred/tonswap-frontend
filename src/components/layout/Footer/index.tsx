import * as React from 'react'
import { Observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import { Link, NavLink } from 'react-router-dom'

import { Icon } from '@/components/common/Icon'
import { Logo } from '@/components/layout/Logo'
import { useWallet } from '@/stores/WalletService'

import './index.scss'


export function Footer(): JSX.Element {
    const intl = useIntl()
    const wallet = useWallet()

    const toolbar = (
        <div className="toolbar">
            <Observer>
                {() => (
                    <>
                        {(!wallet.isInitialized && !wallet.isInitializing) && (
                            <a
                                href="https://chrome.google.com/webstore/detail/ton-crystal-wallet/cgeeodpfagjceefieflmdfphplkenlfk"
                                className="btn btn--xl btn-tertiary footer-tool"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {intl.formatMessage({
                                    id: 'WALLET_INSTALLATION_LINK_TEXT',
                                })}
                            </a>
                        )}
                    </>
                )}
            </Observer>
            <a
                href="https://github.com/broxus/ton-dex"
                className="btn btn--xl btn--empty footer-tool"
                target="_blank"
                rel="noopener noreferrer"
            >
                {intl.formatMessage({
                    id: 'FOOTER_GITHUB_LINK_TEXT',
                })}
            </a>
        </div>
    )

    return (
        <footer className="footer">
            <div className="container container--large">
                <div className="footer__wrapper">
                    <div className="footer__left">
                        <Link to="/" className="footer-logo">
                            <Logo />
                        </Link>
                        {toolbar}
                    </div>
                    <nav className="footer-nav">
                        <div className="footer-nav__col">
                            <div className="footer-nav__col-title">
                                {intl.formatMessage({
                                    id: 'FOOTER_NAV_HEADER_PRODUCT',
                                })}
                            </div>
                            <ul className="footer-nav__list">
                                <li>
                                    <NavLink to="/swap">
                                        {intl.formatMessage({
                                            id: 'NAV_LINK_TEXT_SWAP',
                                        })}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/pools">
                                        {intl.formatMessage({
                                            id: 'NAV_LINK_TEXT_POOLS',
                                        })}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/tokens">
                                        {intl.formatMessage({
                                            id: 'NAV_LINK_TEXT_TOKENS',
                                        })}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/pairs">
                                        {intl.formatMessage({
                                            id: 'NAV_LINK_TEXT_PAIRS',
                                        })}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/farming">
                                        {intl.formatMessage({
                                            id: 'NAV_LINK_TEXT_FARMING',
                                        })}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/builder">
                                        {intl.formatMessage({
                                            id: 'NAV_LINK_TEXT_BUILDER',
                                        })}
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-nav__col">
                            <div className="footer-nav__col-title">
                                {intl.formatMessage({
                                    id: 'FOOTER_NAV_HEADER_DEFI_PRODUCTS',
                                })}
                            </div>
                            <ul className="footer-nav__list">
                                <li>
                                    <a href="https://tonbridge.io" target="_blank" rel="noopener noreferrer">
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_TON_BRIDGE_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://tonscan.io" target="_blank" rel="noopener noreferrer">
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_TON_SCAN_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wton.io" target="_blank" rel="noopener noreferrer">
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_WTON_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://chrome.google.com/webstore/detail/ton-crystal-wallet/cgeeodpfagjceefieflmdfphplkenlfk"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_NAV_CRYSTAL_WALLET_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="footer__right">
                        {toolbar}
                    </div>
                </div>
                <div className="footer__bottom">
                    <ul className="footer-soc">
                        <li>
                            <a
                                href="https://t.me/tonbridge_official"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Telegram"
                            >
                                <Icon icon="telegram" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com/Broxus"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Twitter"
                            >
                                <Icon icon="twitter" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/broxus"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                            >
                                <Icon icon="github" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://broxus.medium.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Medium"
                            >
                                <Icon icon="medium" />
                            </a>
                        </li>
                    </ul>
                    <div className="footer__sub">
                        <p
                            className="footer-copyright"
                            dangerouslySetInnerHTML={{
                                __html: intl.formatMessage({
                                    id: 'FOOTER_COPYRIGHTS',
                                }, {
                                    year: new Date().getFullYear(),
                                }, {
                                    ignoreTag: true,
                                }),
                            }}
                        />
                        <nav className="footer-subnav">
                            <ul>
                                <li>
                                    <a
                                        href="https://broxus.com/wp-content/uploads/2021/08/terms_of_use.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_TERMS_OF_USE_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://broxus.com/wp-content/uploads/2021/08/privacy_policy.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_PRIVACY_POLICY_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://broxus.com/wp-content/uploads/2021/08/cookie_policy.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {intl.formatMessage({
                                            id: 'FOOTER_COOKIES_TERMS_LINK_TEXT',
                                        })}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
