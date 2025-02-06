import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { notification, Card, Typography, List } from 'antd'
import { KeyOutlined } from '@ant-design/icons'
import './App.css'

const { Title, Text } = Typography

interface HotkeyInfo {
  key: string
  description: string
}

function App() {
  const [lastPressed, setLastPressed] = useState<string>('')
  const [api, contextHolder] = notification.useNotification()

  const showNotification = (hotkey: string) => {
    api.info({
      message: 'Hotkey Pressed!',
      description: `You pressed: ${hotkey}`,
      icon: <KeyOutlined style={{ color: '#1890ff' }} />,
      placement: 'topRight',
    })
    setLastPressed(hotkey)
  }

  // Define hotkeys
  const hotkeys: HotkeyInfo[] = [
    { key: 'ctrl+s', description: 'Save' },
    { key: 'ctrl+f', description: 'Find' },
    { key: 'ctrl+b', description: 'Toggle Bold' },
    { key: 'shift+?', description: 'Show Help' },
    { key: 'meta+up', description: 'Move Up' },
    { key: 'ctrl+up', description: 'Move Up (Windows)' },
    { key: 'meta+shift+up', description: 'Move Up with Selection' },
    { key: 'ctrl+shift+up', description: 'Move Up with Selection (Windows)' },
    { key: 'alt+1', description: 'Switch Tab 1' },
  ]

  // Setup hotkey handlers
  hotkeys.forEach(({ key, description }) => {
    useHotkeys(key, (event) => {
      event.preventDefault()
      showNotification(`${key} (${description})`)
    })
  })

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {contextHolder}
      <Card>
        <Title level={2}>Hotkeys Demo</Title>
        <Text>Try pressing any of the following hotkey combinations:</Text>
        
        <List
          style={{ marginTop: '1rem' }}
          bordered
          dataSource={hotkeys}
          renderItem={(item) => (
            <List.Item>
              <Text keyboard>{item.key}</Text>
              <Text style={{ marginLeft: '1rem' }}>{item.description}</Text>
            </List.Item>
          )}
        />

        {lastPressed && (
          <div style={{ marginTop: '1rem' }}>
            <Text type="secondary">Last pressed: </Text>
            <Text strong>{lastPressed}</Text>
          </div>
        )}
      </Card>
    </div>
  )
}

export default App
