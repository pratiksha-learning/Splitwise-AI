import React, { useState } from 'react';
import './ContactOverlay.css';

interface ContactOverlayProps {
  contacts: string[];
  onSelect: (selected: string[]) => void;
}

const ContactOverlay: React.FC<ContactOverlayProps> = ({ contacts, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filteredContacts = contacts.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleContact = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((c) => c !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  return (
    <div className="overlay-backdrop">
      <div className="overlay-box">
        <h2>With whom did you split this?</h2>

        <input
          type="text"
          placeholder="Search name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="overlay-input"
        />

        <ul className="contact-list">
          {filteredContacts.map((c) => (
            <li
              key={c}
              className={`contact-item ${selected.includes(c) ? 'selected' : ''}`}
              onClick={() => toggleContact(c)}
            >
              {c}
            </li>
          ))}
        </ul>

        <button
          className="overlay-button"
          onClick={() => onSelect(selected)}
          disabled={selected.length === 0}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default ContactOverlay;
