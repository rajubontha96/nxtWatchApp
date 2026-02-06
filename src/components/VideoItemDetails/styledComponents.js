import styled from 'styled-components'

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => (props.active ? '#2563eb' : '#64748b')};
`
