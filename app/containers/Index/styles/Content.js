import styled from 'styled-components';
import { grey500, blue800, blue200 } from 'material-ui/styles/colors';

const Content = styled.div`

	h1 {
		font-size: 4em;
		margin-top: 12%;
		margin-bottom: 0.6em;
		font-weight: 300;
	}

	ul {
	  list-style-type: none;
		margin: 0;
		padding: 0;

		li {
			float: left;
			margin: 0 2.4em 0 0;
			padding: 0;

			button {
				margin: 0;
				padding: 0;
				font-size: 1.4em;
				color: ${blue800};

				&:hover {
					color: ${blue200};
				}
			}
		}
	}


`;

export default Content;
