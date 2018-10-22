/**
 * @format
 */

/**
 * External Dependencies
 */
import { merge } from 'lodash';
import { translate } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import { READER_CONVERSATION_MUTE } from 'state/action-types';
import { http } from 'state/data-layer/wpcom-http/actions';
import { dispatchRequestEx } from 'state/data-layer/wpcom-http/utils';
import { errorNotice, plainNotice } from 'state/notices/actions';
import { updateConversationFollowStatus } from 'state/reader/conversations/actions';
import { bypassDataLayer } from 'state/data-layer/utils';
import getReaderConversationFollowStatus from 'state/selectors/get-reader-conversation-follow-status';

import { registerHandlers } from 'state/data-layer/handler-registry';

export function requestConversationMute( action ) {
	return ( dispatch, getState ) => {
		const actionWithRevert = merge( {}, action, {
			meta: {
				previousState: getReaderConversationFollowStatus( getState(), {
					siteId: action.payload.siteId,
					postId: action.payload.postId,
				} ),
			},
		} );
		dispatch(
			http(
				{
					method: 'POST',
					apiNamespace: 'wpcom/v2',
					path: `/read/sites/${ action.payload.siteId }/posts/${ action.payload.postId }/mute`,
					body: {}, // have to have an empty body to make wpcom-http happy
				},
				actionWithRevert
			)
		);
	};
}

export function receiveConversationMute( action, response ) {
	// validate that it worked
	const isMuting = !! ( response && response.success );
	if ( ! isMuting ) {
		return receiveConversationMuteError( action );
	}

	return plainNotice( translate( 'The conversation has been successfully unfollowed.' ), {
		duration: 5000,
	} );
}

export function receiveConversationMuteError( {
	payload: { siteId, postId },
	meta: { previousState },
} ) {
	return [
		errorNotice(
			translate( 'Sorry, we had a problem unfollowing that conversation. Please try again.' )
		),
		bypassDataLayer(
			updateConversationFollowStatus( {
				siteId,
				postId,
				followStatus: previousState,
			} )
		),
	];
}

registerHandlers( 'state/data-layer/wpcom/read/sites/posts/mute/index.js', {
	[ READER_CONVERSATION_MUTE ]: [
		dispatchRequestEx( {
			fetch: requestConversationMute,
			onSuccess: receiveConversationMute,
			onError: receiveConversationMuteError,
		} ),
	],
} );
