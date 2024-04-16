const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
	const { name, year, author, summary, publisher, pageCount, reading, readPage } = request.payload;

	if (!name) {
		const response = h
			.response({
				status: "fail",
				message: "Gagal menambahkan buku. Mohon isi nama buku",
			})
			.code(400);
		return response;
	} else if (readPage > pageCount) {
		const response = h
			.response({
				status: "fail",
				message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
			})
			.code(400);
		return response;
	} else {
		const id = nanoid(16);
		const insertedAt = new Date().toISOString();
		const updatedAt = insertedAt;
		const finished = readPage === pageCount ? true : false;

		const newBook = {
			id,
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			insertedAt,
			updatedAt,
		};

		books.push(newBook);

		const isSuccess = books.filter((book) => book.id === id).length > 0;
		if (isSuccess) {
			const response = h
				.response({
					status: "success",
					message: "Buku berhasil ditambahkan",
					data: {
						bookId: id,
					},
				})
				.code(201);
			return response;
		} else {
			const response = h
				.response({
					status: "fail",
					message: "Gagal menambahkan buku.",
				})
				.code(500);
			return response;
		}
	}
};

const getAllBooksHandler = (request, h) => {
	const { name, reading, finished } = request.query;

	if (books.length > 0) {
		let filterBook = books;
		if (name) {
			filterBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
		}

		if (reading) {
			filterBook = books.filter((book) => Number(book.reading) === Number(reading));
		}

		if (finished) {
			filterBook = books.filter((book) => Number(book.finished) === Number(finished));
		}

		const filteredBook = filterBook.map((book) => ({
			id: book.id,
			name: book.name,
			publisher: book.publisher,
		}));

		const response = h
			.response({
				status: "success",
				data: {
					books: filteredBook,
				},
			})
			.code(200);
		return response;
	}

	const response = h.response({
		status: "success",
		data: {
			books: [],
		},
	});

	response.code(200);
	return response;
};

const getBookByIdHandler = (request, h) => {
	const { bookId } = request.params;
	const book = books.find((b) => b.id === bookId);
	if (!book) {
		const response = h
			.response({
				status: "fail",
				message: "Buku tidak ditemukan",
			})
			.code(404);
		return response;
	}

	const response = h
		.response({
			status: "success",
			data: {
				book,
			},
		})
		.code(200);

	return response;
};

const editBookByIdHandler = (request, h) => {
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
	const updateBook = {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
		updatedAt: new Date().toISOString(),
	};

	const { bookId } = request.params;

	const book = books.find((b) => b.id === bookId);

	if (!name) {
		const response = h
			.response({
				status: "fail",
				message: "Gagal memperbarui buku. Mohon isi nama buku",
			})
			.code(400);
		return response;
	} else if (readPage > pageCount) {
		const response = h
			.response({
				status: "fail",
				message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
			})
			.code(400);
		return response;
	} else if (!book) {
		const response = h
			.response({
				status: "fail",
				message: "Gagal memperbarui buku. Id tidak ditemukan",
			})
			.code(404);
		return response;
	}

	const index = books.findIndex((b) => b.id === bookId);
	if (index !== -1) {
		books[index] = {
			...books[index],
			...updateBook,
		};
		const response = h
			.response({
				status: "success",
				message: "Buku berhasil diperbarui",
			})
			.code(200);
		return response;
	}
};

const deleteBookByIdHandler = (request, h) => {
	const { bookId } = request.params;

	const book = books.findIndex((b) => b.id === bookId);
	if (book !== -1) {
		books.splice(book, 1);
		const response = h
			.response({
				status: "success",
				message: "Buku berhasil dihapus",
			})
			.code(200);
		return response;
	} else {
		const response = h
			.response({
				status: "fail",
				message: "Buku gagal dihapus. Id tidak ditemukan",
			})
			.code(404);
		return response;
	}
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };
