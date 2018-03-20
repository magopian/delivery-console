import { Breadcrumb } from 'antd';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NormandyLink as Link } from 'normandy/Router';

import { getBreadcrumbs } from 'normandy/state/router/selectors';

@connect(
  state => ({
    breadcrumbs: getBreadcrumbs(state),
  }),
)
@autobind
export default class NavigationCrumbs extends React.PureComponent {
  static propTypes = {
    breadcrumbs: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  getCrumbSlug(crumb) {
    return crumb.name.toLowerCase().replace(/\s+/g, '-');
  }

  render() {
    const { breadcrumbs } = this.props;

    return (
      <Breadcrumb>
        {breadcrumbs.map((crumb, idx) =>
          (<Breadcrumb.Item key={idx}>
            <Link to={crumb.link} id={this.getCrumbSlug(crumb)}>{ crumb.name }</Link>
          </Breadcrumb.Item>),
        )}
      </Breadcrumb>
    );
  }
}
