import React, { useState, useEffect, useCallback } from 'react';
import './LocationSearch.css';

const LocationSearch = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [loading, setLoading] = useState(false);

	const debounce = (func, delay) => {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, delay);
		};
	};

	const fetchLocations = async (search) => {
		if (!search) {
			setResults([]);
			return;
		}
		setLoading(true);
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/api/locations?search=${search}`,
			);
			const data = await response.json();
			const resultsArray = Array.isArray(data) ? data : data ? [data] : [];
			setResults(resultsArray);
		} catch (error) {
			console.error('Error fetching locations:', error);
		} finally {
			setLoading(false);
		}
	};

	const debouncedFetch = useCallback(debounce(fetchLocations, 300), []);

	useEffect(() => {
		const savedLocation = localStorage.getItem('selectedLocation');
		if (savedLocation) {
			setSelectedLocation(JSON.parse(savedLocation));
		}
	}, []);

	useEffect(() => {
		debouncedFetch(searchTerm);
	}, [searchTerm, debouncedFetch]);

	const handleSelect = (location) => {
		setSelectedLocation(location);
		setSearchTerm('');
		setResults([]);
		localStorage.setItem('selectedLocation', JSON.stringify(location));
	};

	const handleReset = () => {
		setSelectedLocation(null);
		localStorage.removeItem('selectedLocation');
	};

	const highlightMatch = (text, highlight) => {
		if (typeof text !== 'string') {
			return <span>{text}</span>;
		}
		if (!highlight.trim()) {
			return <span>{text}</span>;
		}
		const regex = new RegExp(`(${highlight})`, 'gi');
		const parts = text.split(regex);
		return (
			<span>
				{parts.map((part, i) =>
					regex.test(part) ? <strong key={i}>{part}</strong> : part,
				)}
			</span>
		);
	};

	return (
		<div className="location-search-container">
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Cari wilayah..."
				className="search-input"
			/>
			{loading && <div className="skeleton-loader"></div>}
			{results.length > 0 && (
				<ul className="results-dropdown">
					{results
						.filter((location) => location.kecamatan)
						.map((location) => (
							<li key={location.id} onClick={() => handleSelect(location)}>
								<div className="location-info">
									<div className="location-name">
										{highlightMatch(location.kecamatan, searchTerm)}
									</div>
									<div className="location-details">
										{location.kota}, {location.provinsi}
									</div>
								</div>
							</li>
						))}
				</ul>
			)}
			{selectedLocation && (
				<div className="selected-location">
					<h4>Kecamatan yang dipilih:</h4>
					<div className="selected-location-info">
						<p>
							<strong>Kecamatan:</strong> {selectedLocation.kecamatan}
						</p>
						<p>
							<strong>Kota:</strong> {selectedLocation.kota}
						</p>
						<p>
							<strong>Provinsi:</strong> {selectedLocation.provinsi}
						</p>
					</div>
					<button onClick={handleReset} className="reset-button">
						Reset
					</button>
				</div>
			)}
		</div>
	);
};

export default LocationSearch;
