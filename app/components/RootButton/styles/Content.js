import styled from 'styled-components';
import { grey500, blue800, blue200 } from 'material-ui/styles/colors';

const Content = styled.div`

	button {
		font-size: 1.4em;
		color: ${blue800};
		margin-top: 2em ;
		padding: 0;
		
		&:hover {
			color: ${blue200};
		}
	}
`;

export default Content;
