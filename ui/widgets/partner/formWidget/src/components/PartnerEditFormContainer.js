import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import keycloakType from 'components/__types__/keycloak';
import withKeycloak from 'auth/withKeycloak';
import { AuthenticatedView, UnauthenticatedView } from 'auth/KeycloakViews';
import { apiPartnerGet, apiPartnerDelete, apiPartnerPut } from 'api/partners';
import Notification from 'components/common/Notification';
import PartnerForm from 'components/PartnerForm';

class PartnerEditFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notificationMessage: null,
      notificationStatus: null,
    };

    this.closeNotification = this.closeNotification.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { keycloak } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    const { keycloak, id } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    const changedAuth = prevProps.keycloak.authenticated !== authenticated;
    const changedId = id && id !== prevProps.id;

    if (authenticated && (changedId || changedAuth)) {
      this.fetchData();
    }
  }

  async fetchData() {
    const { keycloak, id, serviceUrl } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated && id) {
      try {
        const partner = await apiPartnerGet(serviceUrl, id);
        this.setState(() => ({
          partner,
        }));
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  closeNotification() {
    this.setState(() => ({
      notificationMessage: null,
    }));
  }

  async handleSubmit(partner) {
    const { t, onUpdate, keycloak, serviceUrl } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        const updatedPartner = await apiPartnerPut(serviceUrl, partner);
        onUpdate(updatedPartner);

        this.setState({
          partner: updatedPartner,
          notificationMessage: t('common.dataSaved'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  async handleDelete(partner) {
    const { t, onDelete, keycloak, serviceUrl } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        await apiPartnerDelete(serviceUrl, partner.id);
        onDelete(partner);
        this.setState({
          partner: null,
          notificationMessage: t('common.dataDeleted'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  handleError(err) {
    const { t, onError } = this.props;
    onError(err);
    this.setState(() => ({
      notificationMessage: t('error.dataLoading'),
      notificationStatus: Notification.ERROR,
    }));
  }

  render() {
    const { keycloak, onCancelEditing, t } = this.props;
    const { notificationMessage, notificationStatus, partner } = this.state;

    let form;
    if (typeof partner === 'undefined') {
      form = t('entities.partner.notFound');
    } else if (partner === null) {
      form = t('entities.partner.deleted');
    } else {
      form = (
        <PartnerForm
          partner={partner}
          onSubmit={this.handleSubmit}
          onCancelEditing={onCancelEditing}
          onDelete={this.handleDelete}
        />
      );
    }
    return (
      <>
        <UnauthenticatedView keycloak={keycloak}>
          {t('common.notAuthenticated')}
        </UnauthenticatedView>
        <AuthenticatedView keycloak={keycloak}>{form}</AuthenticatedView>
        <Notification
          status={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </>
    );
  }
}

PartnerEditFormContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onCancelEditing: PropTypes.func,
  onError: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  t: PropTypes.func.isRequired,
  keycloak: keycloakType.isRequired,
  serviceUrl: PropTypes.string,
};

PartnerEditFormContainer.defaultProps = {
  onCancelEditing: () => {},
  onDelete: () => {},
  onUpdate: () => {},
  onError: () => {},
  serviceUrl: '',
};

export default withKeycloak(withTranslation()(PartnerEditFormContainer));
