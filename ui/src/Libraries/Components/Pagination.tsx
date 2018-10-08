import * as i18 from 'i18next';
import * as React from "react";

interface IProps {
    page: number;
    hasNext: boolean;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
}

interface IState {

}

export class Pagination extends React.Component<IProps, IState> {

    handlePrev = () => {
        const {page, onPageChange} = this.props;
        if (page > 0) {
            onPageChange(page - 1);
        }
    };

    handleNext = () => {
        const {page, onPageChange, hasNext} = this.props;
        if (hasNext) {
            onPageChange(page + 1);
        }
    };

    render() {
        const {page, hasNext} = this.props;
        return (
            <div className="pagination">
                <nav className="navigation">
                    <ul>
                        <li onClick={this.handlePrev}>
                            <a
                                aria-label={i18.t('Common:Action.PREV')}
                                title={i18.t('Common:Action.PREV')}
                                className={page === 1 ? ' disabled' : ''}
                            >
                                <img src="images/common/arrow.svg" alt={i18.t('Common:Action.PREV')} className="arrow left"/>
                            </a>
                        </li>
                        <li>{this.props.page + 1}</li>
                        <li onClick={this.handleNext}>
                            <a
                                onClick={this.handleNext}
                                aria-label={i18.t('Common:Action.NEXT')}
                                title={i18.t('Common:Action.NEXT')}
                                className={hasNext ? '' : 'disabled'}
                            >
                                <img src="images/common/arrow.svg" alt={i18.t('Common:Action.NEXT')} className="arrow right"/>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}