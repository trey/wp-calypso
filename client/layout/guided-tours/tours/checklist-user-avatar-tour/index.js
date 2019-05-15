/** @format */

/**
 * External dependencies
 */

import React, { Fragment } from 'react';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import meta from './meta';
import {
	ButtonRow,
	Continue,
	makeTour,
	Next,
	SiteLink,
	Step,
	Tour,
} from 'layout/guided-tours/config-elements';

/* eslint-disable wpcalypso/jsx-classname-namespace */
export const ChecklistUserAvatarTour = makeTour(
	<Tour { ...meta }>
		<Step
			name="init"
			target="edit-gravatar"
			placement="beside"
			arrow="left-top"
			style={ {
				animationDelay: '0.7s',
			} }
		>
			{ ( { translate } ) => (
				<Fragment>
					<p>
						{ translate(
							'Personalize your posts and comments with a profile picture. ' +
								'Click on this image to upload your new image.'
						) }
					</p>
					<ButtonRow>
						<Continue target="edit-gravatar" step="image-notice" click hidden />
						<SiteLink isButton={ false } href="/checklist/:site">
							{ translate( 'Return to the checklist' ) }
						</SiteLink>
					</ButtonRow>
				</Fragment>
			) }
		</Step>

		<Step name="image-notice" placement="right">
			{ ( { translate } ) => (
				<Fragment>
					<p>{ translate( "Let's make sure it looks right before we proceed." ) }</p>
					<Next step="crop-image">{ translate( 'Looks good, continue' ) }</Next>
				</Fragment>
			) }
		</Step>

		<Step
			name="crop-image"
			target="image-editor-button-done"
			placement="below"
			arrow="top-right"
			style={ {
				border: '2px solid white',
			} }
		>
			{ ( { translate } ) => (
				<Fragment>
					<p>
						{ translate( 'Alright! Press {{b}}Change My Photo{{/b}} to save your changes.', {
							components: { b: <strong /> },
						} ) }
					</p>
					<Continue target="image-editor-button-done" step="finish" click hidden />
				</Fragment>
			) }
		</Step>

		<Step name="finish" target="edit-gravatar" placement="beside">
			{ ( { translate } ) => (
				<Fragment>
					<h1 className="tours__title">
						<span className="tours__completed-icon-wrapper">
							<Gridicon icon="checkmark" className="tours__completed-icon" />
						</span>
						{ translate( 'Well done!' ) }
					</h1>
					<p>
						{ translate(
							'Your profile picture has been saved. ' +
								"Let's move on and see what's next on our checklist."
						) }
					</p>
					<SiteLink isButton href="/checklist/:site">
						{ translate( 'Return to the checklist' ) }
					</SiteLink>
				</Fragment>
			) }
		</Step>
	</Tour>
);
