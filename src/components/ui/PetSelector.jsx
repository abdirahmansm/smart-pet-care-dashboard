import React, { useState, useEffect, useRef } from 'react';
import Icon from '../common/AppIcon';

const PetSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const dropdownRef = useRef(null);

  const pets = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      status: 'Healthy',
      statusColor: 'success',
      avatar: '/assets/images/pets/max.jpg'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Persian',
      status: 'Monitoring',
      statusColor: 'warning',
      avatar: '/assets/images/pets/luna.jpg'
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'Dog',
      breed: 'Beagle',
      status: 'Healthy',
      statusColor: 'success',
      avatar: '/assets/images/pets/charlie.jpg'
    },
    {
      id: 4,
      name: 'Bella',
      type: 'Cat',
      breed: 'Siamese',
      status: 'Alert',
      statusColor: 'error',
      avatar: '/assets/images/pets/bella.jpg'
    }
  ];

  useEffect(() => {
    if (pets?.length > 0) {
      setSelectedPet(pets?.[0]);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setIsOpen(false);
  };

  const getStatusColor = (color) => {
    const colors = {
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      error: 'var(--color-error)'
    };
    return colors?.[color] || colors?.success;
  };

  if (!selectedPet) return null;

  return (
    <div className="pet-selector-container" ref={dropdownRef}>
      <div
        className="pet-selector-button"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-label="Select pet"
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e?.key === 'Enter' || e?.key === ' ') {
            e?.preventDefault();
            handleToggle();
          }
        }}
      >
        <img
          src={selectedPet?.avatar}
          alt={`${selectedPet?.name} avatar`}
          className="pet-selector-avatar"
        />
        
        <div className="pet-selector-info">
          <span className="pet-selector-name">{selectedPet?.name}</span>
          <div className="flex items-center gap-1">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getStatusColor(selectedPet?.statusColor) }}
            />
            <span className="pet-selector-status">{selectedPet?.status}</span>
          </div>
        </div>

        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          color="var(--color-muted-foreground)"
          className="ml-2"
        />
      </div>
      {isOpen && (
        <div className="pet-selector-dropdown">
          {pets?.map((pet) => (
            <div
              key={pet?.id}
              className={`pet-selector-item ${selectedPet?.id === pet?.id ? 'active' : ''}`}
              onClick={() => handleSelectPet(pet)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${pet?.name}`}
              onKeyDown={(e) => {
                if (e?.key === 'Enter' || e?.key === ' ') {
                  e?.preventDefault();
                  handleSelectPet(pet);
                }
              }}
            >
              <img
                src={pet?.avatar}
                alt={`${pet?.name} avatar`}
                className="w-12 h-12 rounded-full object-cover border-2"
                style={{ 
                  borderColor: selectedPet?.id === pet?.id 
                    ? 'var(--color-primary)' 
                    : 'transparent' 
                }}
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{pet?.name}</span>
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getStatusColor(pet?.statusColor) }}
                    />
                    <span className="text-xs text-muted-foreground">{pet?.status}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {pet?.breed} • {pet?.type}
                </span>
              </div>

              {selectedPet?.id === pet?.id && (
                <Icon 
                  name="Check" 
                  size={16} 
                  color="var(--color-primary)"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetSelector;