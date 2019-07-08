
import { Button } from '@material-ui/core'
import React, { Component } from 'react'

import { image } from '../../firebase'

export interface IImageUploadProps {
    userId: string,
}

export default class ImageUpload extends Component<IImageUploadProps, {}> {

    public handleChange = (userId) => (e) => {
        image.storeImage(userId, e.target.files[0])
    }

    public render() {

        const { userId } = this.props

        return (
            <Button
                variant='contained'
                color='primary'
                style={{ cursor: 'pointer', position: 'relative' }}
            >
                <input
                    type='file'
                    onChange={this.handleChange(userId)}
                    style={{
                        cursor: 'pointer',
                        height: '100%',
                        opacity: 0,
                        position: 'absolute',
                        width: '100%',
                    }}
                />
                Upload
            </Button>
        )
    }
}
