import css from './style.module.scss';
import Modal from 'react-modal';
import React, { Children, useEffect, useId, useMemo, useState } from 'react';
import { useUIContext } from '../UIContext';
import { cx } from '../util';
import SlideoverEdit from '../svg/slideover-edit.svg';
import SlideoverDelete from '../svg/slideover-delete.svg';
import SlideoverClose from '../svg/slideover-close.svg';
import Tabs from '../Tabs';
import TabPager, { Page } from '../TabPager';
const setAppElement = Modal.setAppElement;
const Panel = ({ name, handle, icon = null, children, defaultActive = false, hasTabs = false }) => children;
export { setAppElement, Panel };
export default function Slideover({ isOpen, onRequestClose, heading, onEditClick, onDeleteClick, children, wide = false, }) {
    const tabsLayoutId = useId();
    const [wasOpen, setWasOpen] = useState(isOpen), [depth, setDepth] = useState(0), { openSlideover, closeSlideover, slideoverDepth } = useUIContext();
    const [activeTab, setActiveTab] = useState('');
    const offset = slideoverDepth - depth - 1;
    const { tabs, handles, contents, filteredChildren, panelHasTabs } = useMemo(() => {
        if (!children)
            return { tabs: [], handles: [], contents: {} };
        const count = Children.count(children), asArray = Children.toArray(children);
        if (count === 1 && asArray?.[0]?.type?.name !== Panel.name)
            return {
                tabs: [],
                handles: [],
                contents: {},
                filteredChildren: typeof children === 'function' ? children(depth, offset === 0) : children,
            };
        if (count > 1) {
            let hasPanel = false, hasNonPanel = false;
            Children.forEach(children, child => {
                if (child !== null && child.type.name === Panel.name)
                    hasPanel = true;
                else
                    hasNonPanel = true;
            });
            if (hasPanel && hasNonPanel) {
                throw new Error('Can\'t mix Slideout panels and other elements!');
            }
            else if (!hasPanel && hasNonPanel) {
                return {
                    tabs: [],
                    handles: [],
                    contents: {},
                    filteredChildren: typeof children === 'function' ? children(depth, offset === 0) : children,
                };
            }
        }
        let active = '';
        const { tabs, handles, contents, filteredChildren, panelHasTabs } = Children.toArray(children).reduce((set, child) => {
            const { name, icon, handle, children, defaultActive, hasTabs } = child.props;
            if (activeTab === '' && defaultActive)
                active = handle;
            set.tabs.push({ name, icon, onClick: () => setActiveTab(handle), isActive: handle === activeTab });
            set.handles.push(handle);
            set.contents.push(<Page key={handle} handle={handle}>
					{typeof children === 'function' ? children(depth, offset === 0) : children}
				</Page>);
            set.panelHasTabs[handle] = hasTabs;
            return set;
        }, { tabs: [], handles: [], contents: [], filteredChildren: null, panelHasTabs: {} });
        if (activeTab === '')
            setActiveTab(active || handles[0]);
        return {
            tabs,
            handles,
            contents,
            filteredChildren,
            panelHasTabs,
        };
    }, [children, depth, offset, activeTab]);
    useEffect(() => {
        if (wasOpen && !isOpen)
            closeSlideover();
        setWasOpen(isOpen);
    }, [isOpen]);
    return (<Modal isOpen={isOpen} onRequestClose={onRequestClose} closeTimeoutMS={300} onAfterOpen={() => {
            setDepth(openSlideover());
        }} style={{
            content: {
                '--f-offset': (offset / 100) + (offset / 100),
                '--offset': offset > 0 ? `calc(-${40 * (1 - (((offset * 5) / 100)))}px * ${offset})` : '0px',
            },
        }} className={{
            base: cx(css.slideover, offset === 0 && css.top, wide && css.wide),
            afterOpen: css.afterOpen,
            beforeClose: css.beforeClose,
        }} overlayClassName={css.overlay}>
			<div className={css.controls}>
				{onDeleteClick && <button title="Delete" onClick={onDeleteClick}><SlideoverDelete /></button>}
				{onEditClick && <button title="Edit" onClick={onEditClick}><SlideoverEdit /></button>}
				<button title="Close" onClick={onRequestClose}><SlideoverClose /></button>
			</div>
			{!heading || typeof heading === 'string' || React.isValidElement(heading) ? (<header className={cx(css.header, handles.length > 0 && css.hasTabs)}>
					{heading && <h1>{heading}</h1>}
					{tabs.length > 0 && (<Tabs tabsLayoutId={tabsLayoutId} className={css.tabs} items={tabs}/>)}
				</header>) : heading(tabs.length > 0 && (<Tabs tabsLayoutId={tabsLayoutId} className={css.tabs} items={tabs}/>))}
			<div className={cx(css.content, handles.length > 0 && css.hasTabs)}>
				{handles.length > 0 && (<TabPager active={activeTab} children={contents} className={css.pager} pageClassName={handle => cx(css.tab, panelHasTabs[handle] && css.hasTabs)}/>)}
				{filteredChildren}
			</div>
		</Modal>);
}
Slideover.setAppElement = setAppElement;
