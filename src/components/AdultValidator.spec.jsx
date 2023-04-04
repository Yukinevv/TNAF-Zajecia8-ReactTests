import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdultValidator } from './AdultValidator';
import userEvent from '@testing-library/user-event';

describe('AdultValidator', () => {
	it('should render textbox with label', () => {
		// when
		render(<AdultValidator />);

		// then
		expect(screen.getByRole('textbox')).toBeInTheDocument(); // <- złapie inputa (zwróci błąd jeśli będzie na stronie więcej niż jeden input. Wtedy getAllByRole)

		// expect(screen.getByLabelText('Put your age here')).toBeInTheDocument(); // <- złapie inputa, ale tego, który ma taki label text
		// expect(screen.getByRole('textbox', { name: /put your age here/i })).toBeInTheDocument(); // <- złapie inputa, który będzie miał taki label
		// expect(screen.getByText('Put your age here')).toBeInTheDocument(); // <- złapie label, nie inputa. Sprawdzamy czy "coś" z takim tekstem jest na stronie
		// expect(screen.getByText('Put your age here')).toHaveAttribute('for', 'age'); // <- możemy sprawdzić czy ma odpowiedni atrybut
	});

	it('should not render alert box by default', () => {
		// when
		render(<AdultValidator />);

		// then
		expect(screen.queryByRole('alert')).not.toBeInTheDocument(); // <- getByRole gdy nie znajdzie elementu od razu failuje test
		// dlatego do szukania elementów, których oczekujemy, że nie będzie - używamy queryByRole
	});

	it('should show TO YOUNG alert after entering value smaller than min', async () => {
		// given
		render(<AdultValidator />);
		const input = screen.getByRole('textbox', { name: /put your age here/i });

		// when
		await userEvent.type(input, '3'); // <- symulowanie akcji użytkownika

		// then
		const alertBox = await screen.findByRole('alert'); // <- find(ByRole) używamy do elementów, które dopiero mają się pojawić
		// test musi być asynchroniczny (skladnia async await), alert pojawi się dopiero po wpisaniu przez nas wartości dlatego musimy na nią "poczekać"
		expect(alertBox).toHaveTextContent(/are you really so young/i);
	});

	it('should show TO YOUNG alert after entering value smaller than min', async () => {
		// given
		render(<AdultValidator min={5} max={100} />);
		const input = screen.getByRole('textbox', { name: /put your age here/i });

		// when
		await userEvent.type(input, '3'); // <- symulowanie akcji użytkownika

		// then
		const alertBox = await screen.findByRole('alert'); // <- find(ByRole) używamy do elementów, które dopiero mają się pojawić
		expect(alertBox).toHaveTextContent(/are you really so young/i);
	});

	it('should show ARE YOU REALLY SO OLD alert after entring value higher than max', async () => {
		// given
		render(<AdultValidator />);
		const input = screen.getByRole('textbox', { name: /put your age here/i });

		// when
		await userEvent.type(input, '101'); // <- symulowanie akcji użytkownika

		// then
		const alertBox = await screen.findByRole('alert');

		expect(alertBox).toHaveTextContent(/Are you really so old/i);
	});

	it('should show YOU ARE GROWN UP alert after entring value higher than max', async () => {
		// given
		render(<AdultValidator min={3} max={50} />);
		const input = screen.getByRole('textbox', { name: /put your age here/i });

		// when
		await userEvent.type(input, '18'); // <- symulowanie akcji użytkownika

		// then
		const alertBox = await screen.findByRole('alert');

		expect(alertBox).toHaveTextContent(/You are grown up/i);
	});

	it('should show ARE YOU REALLY SO OLD alert after entring value higher than max', async () => {
		// given
		render(<AdultValidator min={3} max={50} />);
		const input = screen.getByRole('textbox', { name: /put your age here/i });

		// when
		await userEvent.type(input, '51'); // <- symulowanie akcji użytkownika

		// then
		const alertBox = await screen.findByRole('alert');

		expect(alertBox).toHaveTextContent(/Are you really so old/i);
	});
});
