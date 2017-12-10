import styled from 'styled-components';
import { grey500, blue800, blue200 } from 'material-ui/styles/colors';

const Content = styled.div`

	h1 {
		font-size: 4em;
		margin-top: 1em;
		margin-bottom: 2em;
		font-weight: 300;
	}

	input {
		margin: 0 2em 0 0;
		min-width: 400px;
		border: none;
		border-style:none;
		border-bottom: 1px solid #ccc;
		border-radius: 0;
		box-shadow: none !important;
	}

	h2 {
		margin: 2em 0 1em 0;

		&.init {
			margin-top: 0;
		}
	}

	ul.carOptions {
		span {
			margin: 0 0.5em 0 2em;

			&:first-child {
				margin-left: 0;
			}
		}
	}
`;

export default Content;
