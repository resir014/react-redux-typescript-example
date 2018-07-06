import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { ApplicationState } from '../store'
import { ThemeColors } from '../store/layout'
import * as layoutActions from '../store/layout/actions'

// Now here is an example of creating container components.
//
// Before React v16 I would've suggested against implementing container components that are
// separate from their connected view logic, since they intrude at the very definition of a view,
// but now with newer patterns (e.g. render props), it makes sense to use them once again.
//
// See how this works at `./src/components/Header`

// Separate state props + dispatch props to their own interfaces.

// Props passed from mapStateToProps
interface PropsFromState {
  theme: ThemeColors
}

// Props passed from mapDispatchToProps
interface PropsFromDispatch {
  setTheme: typeof layoutActions.setTheme
}

// Component-specific props.
interface OtherProps {
  children: (props: LayoutContainerProps) => React.ReactNode
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type LayoutContainerProps = PropsFromState & PropsFromDispatch

class LayoutContainer extends React.Component<LayoutContainerProps & OtherProps> {
  public render() {
    const { children, ...rest } = this.props

    return children({ ...rest })
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ layout }: ApplicationState) => ({
  theme: layout.theme
})

// Mapping our action dispatcher to props is especially useful when creating container components.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheme: (theme: ThemeColors) => dispatch(layoutActions.setTheme(theme))
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutContainer)
