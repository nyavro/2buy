import * as React from 'react';
import {MdClearAll, MdClose} from 'react-icons/md';
import {
    Button,
    Nav,
    NavItem,
    NavLink as BSNavLink,
} from 'reactstrap';
import MediaQuery from 'react-responsive';
import {IMixedProps} from 'Libraries/Core/Models';
import {IMenuItem} from 'Libraries/Components/Models';
require('./assets/styles/MainMenu.styl');

interface IOwnProps extends IMixedProps {
    menuItems: IMenuItem[];
}

interface IState {
    showSidebar: boolean;
}

export class MainMenu extends React.Component<IOwnProps, IState> {

    state = {
        showSidebar: false
    };

    handleSidebarControlButton = () => {
        this.setState({showSidebar: !this.state.showSidebar});
    };

    renderMenuItems = () => {
        const {i18n, menuItems} = this.props;
        return menuItems.map(({ link, i18nKey, Icon}, index) => (
            <NavItem key={index}>
                <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    href={link}>
                    <Icon className="menuIcon"/>
                    <span className="menuItem">{i18n.t(`${i18nKey}`)}</span>
                </BSNavLink>
            </NavItem>
        ))
    };

    render() {
        return (
            <div className="mainMenu">
                <div>
                    <MediaQuery minWidth={992}>
                        <Nav className="col-sm-12 col-md-6 col-md-offset-3">
                            {this.renderMenuItems()}
                        </Nav>
                    </MediaQuery>
                    <MediaQuery maxWidth={992}>
                        <Nav className="col-sm-12 col-md-6 col-md-offset-3">
                            <NavItem >
                                <Button outline onClick={this.handleSidebarControlButton}>
                                    <MdClearAll size={25}/>
                                </Button>
                            </NavItem>
                        </Nav>
                    </MediaQuery>
                </div>
                <MediaQuery maxWidth={992}>
                    <Nav className={this.state.showSidebar ? 'cr-sidebar cr-sidebar-open' : 'cr-sidebar'} vertical>
                        <div className="header">
                            <MdClose onClick={this.handleSidebarControlButton} className="btn"/>
                        </div>
                        {this.renderMenuItems()}
                    </Nav>
                </MediaQuery>
            </div>
        );
    }
}
