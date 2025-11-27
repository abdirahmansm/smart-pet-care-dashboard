import React from 'react'
import Button from '../../../components/ui/Button'

const ThresholdConfigCard = ({ config, onSave }) => {
  if (!config) return null

  const handleSave = () => {
    onSave?.(config?.id, { ...config, lastUpdated: new Date().toISOString() })
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{config?.name}</h3>
          <p className="text-xs text-muted-foreground">{config?.description}</p>
        </div>
        <span className="text-xs text-muted-foreground">{config?.unit}</span>
      </div>
      <div className="text-xs text-muted-foreground">
        Range: {config?.minValue} — {config?.maxValue}
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="px-2 py-1 border border-border rounded-full">
          Email: {config?.notifyEmail ? 'On' : 'Off'}
        </span>
        <span className="px-2 py-1 border border-border rounded-full">
          SMS: {config?.notifySMS ? 'On' : 'Off'}
        </span>
        <span className="px-2 py-1 border border-border rounded-full">
          Push: {config?.notifyPush ? 'On' : 'Off'}
        </span>
      </div>
      <Button variant="outline" size="sm" onClick={handleSave}>
        Save
      </Button>
    </div>
  )
}

export default ThresholdConfigCard
