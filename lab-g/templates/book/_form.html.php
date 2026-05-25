<?php
    /** @var $book ?\App\Model\Book */
?>

<div class="form-group">
    <label for="subject">Title</label>
    <input type="text" id="subject" name="book[title]" value="<?= $book ? $book->getTitle() : '' ?>">
</div>

<div class="form-group">
    <label for="content">Author</label>
    <input type="text" id="content" name="book[author]" value="<?= $book? $book->getAuthor() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
