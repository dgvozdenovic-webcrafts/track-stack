import React from 'react'
import { connect } from 'react-redux'
import { IState } from '../domain/store'

const mapStateToProps = (state: IState) => state

const format = (t) => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const pad = (n) => n < 10 ? `0${n}` : n

const Clock: React.SFC<IState> = ({ lastUpdate, light }: { lastUpdate: number, light: boolean }) => {
  return (
    <div className={light ? 'light' : ''}>
      {format(new Date(lastUpdate))}
    </div>
  )
}

export default connect<IState>(mapStateToProps)(Clock)
