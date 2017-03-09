from tornado.web import StaticFileHandler


class GzippedContentHandler(StaticFileHandler):

    def ___init__(self, *args, **kwargs):
        super(GzippedContentHandler, self).__init__(*args, **kwargs)

    @classmethod
    def get_absolute_path(cls, root, path):
        path = StaticFileHandler.get_absolute_path(root, path)
        path += ".gz"
        return path

    def set_extra_headers(self, path):
        self.set_header('Content-Encoding', 'gzip')
        self.set_header('Accept-Encoding', 'gzip')
        self.set_header('Content-Type', 'text/javascript')
